// src/pages/Community/Contact/ContactForm.tsx
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@config/firebase';
import { useTranslation } from 'react-i18next';
import '../../../assets/css/contact.css';

type FileMeta = { name: string; url: string; size: number; type: string };

// i18n용 key 배열
const INQUIRY_TYPES = ['general', 'partnership', 'purchase', 'etc'] as const;
const PRODUCT_TYPES = ['drone', 'gis', 'fms', 'rnd', 'etc'] as const;

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
	const { t } = useTranslation();
	const [form, setForm] = useState<FormState>(initialForm);
	const [submitting, setSubmitting] = useState(false);
	const [done, setDone] = useState(false);
	const [err, setErr] = useState<string | null>(null);

	const onFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const el = e.currentTarget;

		// 체크박스
		if ('type' in el && (el as HTMLInputElement).type === 'checkbox') {
			setForm(prev => ({ ...prev, [el.name]: (el as HTMLInputElement).checked }));
			return;
		}

		// 셀렉트 (숫자 인덱스)
		if (el.tagName === 'SELECT') {
			setForm(prev => ({ ...prev, [el.name]: Number((el as HTMLSelectElement).value) }));
			return;
		}

		// 텍스트/이메일/전화 등
		setForm(prev => ({ ...prev, [el.name]: el.value }));
	};

	const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files ? Array.from(e.target.files) : [];
		setForm(prev => ({ ...prev, files }));
	};

	// === 유효성 검사 ===
	const validate = () => {
		if (!form.isAgree) return t('contact_detail.error.agree');
		if (!form.company.trim()) return t('contact_detail.error.company');
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return t('contact_detail.error.email');
		if (!form.manager.trim()) return t('contact_detail.error.manager');
		if (!form.use.trim()) return t('contact_detail.error.subject');
		if (!form.text.trim()) return t('contact_detail.error.text');
		return null;
	};

	// === 파일 업로드 ===
	const uploadAll = async (): Promise<FileMeta[]> => {
		if (!form.files.length) return [];
		const folder = `contact/${Date.now()}`;
		const result: FileMeta[] = [];

		const storageInstance = storage(); // 인스턴스

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

			const { company, email, manager, phone, rank, selectedButton, selectedProductButton, text, use, isAgree } = form;
			const firestore = db();

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
			<h2>{t('contact_detail.title')}</h2>

			{done ? (
				<div className="contact-done">
					<h4>{t('contact_detail.done.title')}</h4>
					<button type="button" onClick={() => setDone(false)}>
						{t('contact_detail.done.new')}
					</button>
				</div>
			) : (
				<form onSubmit={onSubmit} className="contact-form">
					<div className="row">
						<label>
							{t('contact_detail.label.subject')} <span className="essential">*</span>
						</label>
						<input name="use" value={form.use} onChange={onFieldChange} placeholder={t('contact_detail.placeholder.subject')} />
					</div>

					<div className="row two">
						<div>
							<label>
								{t('contact_detail.label.company')} <span className="essential">*</span>
							</label>
							<input name="company" value={form.company} onChange={onFieldChange} placeholder={t('contact_detail.placeholder.company')} />
						</div>
						<div>
							<label>
								{t('contact_detail.label.manager')} <span className="essential">*</span>
							</label>
							<input name="manager" value={form.manager} onChange={onFieldChange} placeholder={t('contact_detail.placeholder.manager')} />
						</div>
					</div>

					<div className="row two">
						<div>
							<label>
								{t('contact_detail.label.email')} <span className="essential">*</span>
							</label>
							<input type="email" name="email" value={form.email} onChange={onFieldChange} placeholder={t('contact_detail.placeholder.email')} />
						</div>
						<div>
							<label>{t('contact_detail.label.phone')}</label>
							<input name="phone" value={form.phone} onChange={onFieldChange} placeholder={t('contact_detail.placeholder.phone')} />
						</div>
					</div>

					<div className="row two">
						<div>
							<label>{t('contact_detail.label.inquiryType')}</label>
							<select name="selectedButton" value={form.selectedButton} onChange={onFieldChange}>
								{INQUIRY_TYPES.map((key, i) => (
									<option key={key} value={i}>
										{t(`contact_detail.inquiryTypes.${key}`)}
									</option>
								))}
							</select>
						</div>

						<div>
							<label>
								{t('contact_detail.label.productType')} <span className="essential">*</span>
							</label>
							<select name="selectedProductButton" value={form.selectedProductButton} onChange={onFieldChange}>
								{PRODUCT_TYPES.map((key, i) => (
									<option key={key} value={i}>
										{t(`contact_detail.productTypes.${key}`)}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className="row last">
						<label>
							{t('contact_detail.label.text')} <span className="essential">*</span>
						</label>
						<textarea name="text" rows={7} value={form.text} onChange={onFieldChange} placeholder={t('contact_detail.placeholder.text')} />
					</div>

					<div className="row">
						<label>{t('contact_detail.label.files')}</label>
						<input type="file" multiple onChange={onFiles} />
						{form.files.length > 0 && <p>{t('contact_detail.files.selected', { count: form.files.length })}</p>}
					</div>

					<label className="agree">
						<input type="checkbox" name="isAgree" checked={form.isAgree} onChange={onFieldChange} /> {t('contact_detail.label.agreeText')}
					</label>

					{err && <p className="error">{err}</p>}

					<button disabled={submitting} type="submit">
						{submitting ? t('contact_detail.button.submitting') : t('contact_detail.button.submit')}
					</button>
				</form>
			)}
		</section>
	);
};

export default ContactForm;
