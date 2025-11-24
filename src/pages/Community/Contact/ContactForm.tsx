// src/pages/Community/Contact/ContactForm.tsx
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@config/firebase';
import '../../../assets/css/contact.css';

type FileMeta = { name: string; url: string; size: number; type: string };

const INQUIRY_TYPES = ['일반 문의', '제휴 문의', '구매/견적 문의', '기타 문의'] as const;
const PRODUCT_TYPES = ['드론', 'GIS', 'FMS', 'R&D', '기타'] as const;

interface FormState {
	company: string;
	email: string;
	manager: string;
	phone: string;
	rank: string;
	selectedButton: number;
	selectedProductButton: number;
	text: string;
	use: string;
	isAgree: boolean;
	files: File[];
}

const initialForm: FormState = {
	company: '',
	email: '',
	manager: '',
	phone: '',
	rank: '',
	selectedButton: 0,
	selectedProductButton: 0,
	text: '',
	use: '',
	isAgree: false,
	files: [],
};

const ContactForm: React.FC = () => {
	const [form, setForm] = useState<FormState>(initialForm);
	const [submitting, setSubmitting] = useState(false);
	const [done, setDone] = useState(false);
	const [err, setErr] = useState<string | null>(null);

	const onFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const el = e.currentTarget;

		// 체크박스 처리
		if ('type' in el && (el as HTMLInputElement).type === 'checkbox') {
			setForm(prev => ({ ...prev, [el.name]: (el as HTMLInputElement).checked }));
			return;
		}

		// 셀렉트 박스(숫자 인덱스) 처리
		if (el.tagName === 'SELECT') {
			setForm(prev => ({ ...prev, [el.name]: Number((el as HTMLSelectElement).value) }));
			return;
		}

		// 나머지 텍스트/이메일/전화 등
		setForm(prev => ({ ...prev, [el.name]: el.value }));
	};

	const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files ? Array.from(e.target.files) : [];
		setForm(prev => ({ ...prev, files }));
	};

	const validate = () => {
		if (!form.isAgree) return '개인정보 처리 동의가 필요합니다.';
		if (!form.company.trim()) return '회사명을 입력하세요.';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return '이메일이 올바르지 않습니다.';
		if (!form.manager.trim()) return '담당자명을 입력하세요.';
		if (!form.use.trim()) return '제목을 입력하세요.';
		if (!form.text.trim()) return '문의 내용을 입력하세요.';
		return null;
	};

	const uploadAll = async (): Promise<FileMeta[]> => {
		if (!form.files.length) return [];
		const folder = `contact/${Date.now()}`;
		const result: FileMeta[] = [];

		// ✅ 함수 호출해서 진짜 인스턴스를 꺼냄
		const storageInstance = storage();

		for (const f of form.files) {
			const fileRef = ref(storageInstance, `${folder}/${encodeURIComponent(f.name)}`);
			await uploadBytes(fileRef, f);
			const url = await getDownloadURL(fileRef);
			result.push({ name: f.name, url, size: f.size, type: f.type });
		}

		return result;
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const errorMsg = validate();
		if (errorMsg) {
			setErr(errorMsg);
			return;
		}

		setSubmitting(true);
		setErr(null);

		try {
			const fileData = await uploadAll();

			// files만 빼고 필요한 필드만 골라서 저장
			const { company, email, manager, phone, rank, selectedButton, selectedProductButton, text, use, isAgree } = form;

			const firestore = db(); // ✅ 인스턴스 꺼내기

			await addDoc(collection(firestore, 'contact'), {
				company,
				email,
				manager,
				phone,
				rank,
				selectedButton,
				selectedProductButton,
				text,
				use,
				isAgree,
				fileData,
				timestamp: Date.now(),
			});

			setDone(true);
			setForm(initialForm);
		} catch (error) {
			setErr(error instanceof Error ? error.message : String(error));
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<section className="contact-section content-box">
			<h2>더 나은 서비스를 위해 고객님의 의견을 기다립니다.</h2>

			{done ? (
				<div>
					<h4>문의가 정상적으로 접수되었습니다.</h4>
					<button type="button" onClick={() => setDone(false)}>
						새 문의 작성
					</button>
				</div>
			) : (
				<form onSubmit={onSubmit} className="contact-form">
					<div className="row">
						<label>
							제목 <span className="essential">*</span>
						</label>
						<input name="use" value={form.use} onChange={onFieldChange} placeholder="ex) 로고 사용 문의" />
					</div>

					<div className="row two">
						<div>
							<label>
								회사 <span className="essential">*</span>
							</label>
							<input name="company" value={form.company} onChange={onFieldChange} placeholder="회사명" />
						</div>
						<div>
							<label>
								담당자 <span className="essential">*</span>
							</label>
							<input name="manager" value={form.manager} onChange={onFieldChange} placeholder="담당자명" />
						</div>
					</div>

					<div className="row two">
						<div>
							<label>
								이메일 <span className="essential">*</span>
							</label>
							<input type="email" name="email" value={form.email} onChange={onFieldChange} placeholder="example@domain.com" />
						</div>
						<div>
							<label>전화번호</label>
							<input name="phone" value={form.phone} onChange={onFieldChange} placeholder="숫자만 입력" />
						</div>
					</div>

					<div className="row two">
						<div>
							<label>문의 분류</label>
							<select name="selectedButton" value={form.selectedButton} onChange={onFieldChange}>
								{INQUIRY_TYPES.map((t, i) => (
									<option key={i} value={i}>
										{t}
									</option>
								))}
							</select>
						</div>

						<div>
							<label>
								제품 분류<span className="essential">*</span>
							</label>
							<select name="selectedProductButton" value={form.selectedProductButton} onChange={onFieldChange}>
								{PRODUCT_TYPES.map((t, i) => (
									<option key={i} value={i}>
										{t}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className="row last">
						<label>
							문의내용<span className="essential">*</span>
						</label>
						<textarea name="text" rows={7} value={form.text} onChange={onFieldChange} placeholder="문의 내용을 입력하세요" />
					</div>

					<div className="row">
						<label>첨부파일</label>
						<input type="file" multiple onChange={onFiles} />
						{form.files.length > 0 && <p>첨부 {form.files.length}개 선택됨</p>}
					</div>

					<label className="agree">
						<input type="checkbox" name="isAgree" checked={form.isAgree} onChange={onFieldChange} /> 개인정보 처리에 동의합니다.
					</label>

					{err && <p className="error">{err}</p>}

					<button disabled={submitting} type="submit">
						{submitting ? '전송 중...' : '문의 접수'}
					</button>
				</form>
			)}
		</section>
	);
};

export default ContactForm;
