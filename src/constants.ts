export const SchemaNames = {
  User: 'User',
  Classroom: 'Classroom',
  Subject: 'Subject',
  Student: 'Student',
  Assessment: 'Assessment',
  AssessmentCriteria: 'AssessmentCriteria',
  SubjectClassEnrollment: 'SubjectClassEnrollment',
  UserClassEnrollment: 'UserClassEnrollment',
  StudentClassEnrollment: 'StudentClassEnrollment',
  SAAC: 'SAAC',
};

export const ExamType = {
  formative: 'formative',
  summative: 'summative',
} as const;

export type ExamType = (typeof ExamType)[keyof typeof ExamType];

export const DB_NAME: string = 'edutrack-development-data';
