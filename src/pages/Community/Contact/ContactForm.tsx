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
	selectedButton: number; // INQUIRY_TYPES index
	selectedProductButton: number; // PRODUCT_TYPES index
	text: string;
	use: string; // 제목(용도)
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

	// ✅ 하나의 핸들러로 input/textarea/select/checkbox 모두 처리 (타입 가드)
	const onFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const el = e.currentTarget;

		// checkbox
		if ('type' in el && (el as HTMLInputElement).type === 'checkbox' && 'checked' in el) {
			const input = el as HTMLInputElement;
			setForm(s => ({ ...s, [input.name]: input.checked }));
			return;
		}

		// select → number
		if (el.tagName === 'SELECT') {
			const sel = el as HTMLSelectElement;
			setForm(s => ({ ...s, [sel.name]: Number(sel.value) }));
			return;
		}

		// input/textarea → string
		const field = el as HTMLInputElement | HTMLTextAreaElement;
		setForm(s => ({ ...s, [field.name]: field.value }));
	};

	// 파일 선택
	const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.currentTarget.files ? Array.from(e.currentTarget.files) : [];
		setForm(s => ({ ...s, files }));
	};

	const validate = (): string | null => {
		if (!form.isAgree) return '개인정보 처리에 동의가 필요합니다.';
		if (!form.company.trim()) return '회사명을 입력해주세요.';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return '이메일 형식이 올바르지 않습니다.';
		if (!form.manager.trim()) return '담당자명을 입력해주세요.';
		if (!form.use.trim()) return '제목(용도)을 입력해주세요.';
		if (!form.text.trim()) return '문의 내용을 입력해주세요.';
		return null;
	};

	const uploadAll = async (): Promise<FileMeta[]> => {
		if (!form.files.length) return [];
		const folder = `contact/${Date.now()}`;
		const result: FileMeta[] = [];
		for (const f of form.files) {
			const path = `${folder}/${encodeURIComponent(f.name)}`;
			const r = ref(storage, path);
			await uploadBytes(r, f);
			const url = await getDownloadURL(r);
			result.push({ name: f.name, url, size: f.size, type: f.type });
		}
		return result;
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const v = validate();
		if (v) {
			setErr(v);
			return;
		}

		setSubmitting(true);
		setErr(null);
		try {
			const fileData = await uploadAll();

			// 🔒 관리자 콘솔 스키마에 맞춰 contact 컬렉션에 저장
			await addDoc(collection(db, 'contact'), {
				company: form.company,
				email: form.email,
				fileData, // [{ name, url, size, type }]
				isAgree: form.isAgree,
				manager: form.manager,
				phone: form.phone,
				rank: form.rank,
				selectedButton: form.selectedButton,
				selectedProductButton: form.selectedProductButton,
				text: form.text,
				timestamp: Date.now(), // number(ms)
				use: form.use,
			});

			setDone(true);
			setForm(initialForm);
		} catch (e) {
			setErr(e instanceof Error ? e.message : String(e));
		} finally {
			setSubmitting(false);
		}
	};

	if (done) {
		return (
			<section className="contact-section">
				<h3>문의 접수 완료</h3>
				<p>정상적으로 접수되었습니다. 빠르게 확인 후 회신드리겠습니다.</p>
				<button onClick={() => setDone(false)}>새 문의 작성</button>
			</section>
		);
	}

	return (
		<section className="contact-section">
			<h3>문의하기</h3>

			<form onSubmit={onSubmit} noValidate className="contact-form">
				<div className="row">
					<label htmlFor="use">제목(용도) *</label>
					<input id="use" name="use" value={form.use} onChange={onFieldChange} placeholder="예) [대한상공회의소] 부산월드엑스포 관련 로고 사용 협조 문의" />
				</div>

				<div className="row two">
					<div>
						<label htmlFor="company">회사 *</label>
						<input id="company" name="company" value={form.company} onChange={onFieldChange} placeholder="회사명" />
					</div>
					<div>
						<label htmlFor="manager">담당자 *</label>
						<input id="manager" name="manager" value={form.manager} onChange={onFieldChange} placeholder="성함" />
					</div>
				</div>

				<div className="row two">
					<div>
						<label htmlFor="rank">직책</label>
						<input id="rank" name="rank" value={form.rank} onChange={onFieldChange} placeholder="직책" />
					</div>
					<div>
						<label htmlFor="phone">전화</label>
						<input id="phone" name="phone" value={form.phone} onChange={onFieldChange} placeholder="숫자만 입력" inputMode="numeric" />
					</div>
				</div>

				<div className="row">
					<label htmlFor="email">이메일 *</label>
					<input id="email" name="email" type="email" value={form.email} onChange={onFieldChange} placeholder="example@domain.com" />
				</div>

				<div className="row two">
					<div>
						<label htmlFor="selectedButton">문의 분류</label>
						<select id="selectedButton" name="selectedButton" value={form.selectedButton} onChange={onFieldChange}>
							{INQUIRY_TYPES.map((label, i) => (
								<option key={label} value={i}>
									{label}
								</option>
							))}
						</select>
					</div>
					<div>
						<label htmlFor="selectedProductButton">제품 분류</label>
						<select id="selectedProductButton" name="selectedProductButton" value={form.selectedProductButton} onChange={onFieldChange}>
							{PRODUCT_TYPES.map((label, i) => (
								<option key={label} value={i}>
									{label}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className="row">
					<label htmlFor="text">문의 내용 *</label>
					<textarea id="text" name="text" rows={8} value={form.text} onChange={onFieldChange} placeholder="문의 내용을 입력해주세요." />
				</div>

				<div className="row">
					<label htmlFor="files">첨부파일</label>
					<input id="files" type="file" multiple onChange={onFiles} />
					{form.files.length > 0 && (
						<p className="hint">
							첨부 {form.files.length}개: {form.files.map(f => f.name).join(', ')}
						</p>
					)}
				</div>

				<label className="agree">
					<input type="checkbox" name="isAgree" checked={form.isAgree} onChange={onFieldChange} />
					개인정보 수집 및 이용에 동의합니다.
				</label>

				{err && <p className="error">{err}</p>}
				<button type="submit" disabled={submitting}>
					{submitting ? '전송 중…' : '문의 접수'}
				</button>
			</form>

			<style>{`
        .contact-form { max-width: 720px; display: grid; gap: 14px; }
        .row { display: grid; gap: 8px; }
        .row.two { grid-template-columns: 1fr 1fr; gap: 16px; }
        input, select, textarea, button { padding: 10px; font-size: 14px; }
        button { cursor: pointer; }
        .agree { margin-top: 6px; display: flex; gap: 8px; align-items: center; }
        .error { color: crimson; }
        .hint { font-size: 12px; opacity: .7; }
      `}</style>
		</section>
	);
};

export default ContactForm;
