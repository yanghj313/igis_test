// src/pages/Community/Contact/ContactForm.tsx
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@config/firebase';

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
	const [form, setForm] = useState(initialForm);
	const [submitting, setSubmitting] = useState(false);
	const [done, setDone] = useState(false);
	const [err, setErr] = useState<string | null>(null);

	const onFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const el = e.currentTarget;

		if ('type' in el && (el as HTMLInputElement).type === 'checkbox') {
			setForm(prev => ({ ...prev, [el.name]: (el as HTMLInputElement).checked }));
			return;
		}

		if (el.tagName === 'SELECT') {
			setForm(prev => ({ ...prev, [el.name]: Number((el as HTMLSelectElement).value) }));
			return;
		}

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

		for (const f of form.files) {
			const fileRef = ref(storage(), `${folder}/${encodeURIComponent(f.name)}`);
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
			const firestore = db();
			const fileData = await uploadAll();

			await addDoc(collection(firestore, 'contact'), {
				...form,
				fileData,
				timestamp: Date.now(),
			});

			setDone(true);
			setForm(initialForm);
		} catch (err) {
			setErr(err instanceof Error ? err.message : String(err));
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<section className="contact-section">
			<h3>문의하기</h3>

			{done ? (
				<div>
					<h4>문의가 정상적으로 접수되었습니다.</h4>
					<button onClick={() => setDone(false)}>새 문의 작성</button>
				</div>
			) : (
				<form onSubmit={onSubmit} className="contact-form">
					<div className="row">
						<label>제목 *</label>
						<input name="use" value={form.use} onChange={onFieldChange} placeholder="ex) 로고 사용 문의" />
					</div>

					<div className="row two">
						<div>
							<label>회사 *</label>
							<input name="company" value={form.company} onChange={onFieldChange} />
						</div>
						<div>
							<label>담당자 *</label>
							<input name="manager" value={form.manager} onChange={onFieldChange} />
						</div>
					</div>

					<div className="row two">
						<div>
							<label>직책</label>
							<input name="rank" value={form.rank} onChange={onFieldChange} />
						</div>
						<div>
							<label>전화번호</label>
							<input name="phone" value={form.phone} onChange={onFieldChange} />
						</div>
					</div>

					<div className="row">
						<label>이메일 *</label>
						<input type="email" name="email" value={form.email} onChange={onFieldChange} />
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
							<label>제품 분류</label>
							<select name="selectedProductButton" value={form.selectedProductButton} onChange={onFieldChange}>
								{PRODUCT_TYPES.map((t, i) => (
									<option key={i} value={i}>
										{t}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className="row">
						<label>내용 *</label>
						<textarea name="text" rows={7} value={form.text} onChange={onFieldChange} />
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
