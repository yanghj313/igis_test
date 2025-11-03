// src/types/contact.ts
export interface ContactSubmission {
	id: string;
	name: string;
	company?: string;
	email: string;
	phone?: string;
	message: string;
	createdAt?: number; // ms
	status?: 'new' | 'in_progress' | 'done';
}
