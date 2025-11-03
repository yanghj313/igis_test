// src/types/recruit.ts
export interface RecruitDoc {
	id: string;
	title?: string; // 없을 수 있음 → work로 대체 표시
	description?: string;
	category?: number; // 0
	condition?: string; // "본사 출근 9시 출근 6시 퇴근"
	experience?: string; // "영상 제작 관리 능력이 있는 분"
	find?: string; // "커뮤니케이션 능력이 높은 분"
	fixtime?: number; // 1685601271984
	period?: {
		start?: number; // 1683644400000
		finish?: number; // 1685109600000
		timestamp?: number; // 1684822858904
	};
	view?: number; // 392
	work?: string; // "사내 행사 관리 대외행사 총괄 관리"
}
