USE [Admitted];
GO

set identity_insert [User] on
insert into [User] (Id, FullName, Email) values (1, 'John Doe', 'example@email.com'),  (2, 'Test User', 'test@email.com');
set identity_insert [User] off

set identity_insert [Admission] on
insert into [Admission] (Id, Reason, HospitalName, RoomNum, RoomPhoneNum, NurseChangeTime, DoctorMeetTime, EstimatedStayDays, StartDateTime, EndDateTime, UserId) values (1, 'Esophageal Tumor', 'Cabell Huntington Hospital', 201, '(304) 555-5555', '07:30', '14:00', 3, '2023-07-29', NULL, 1);
set identity_insert [Admission] off

set identity_insert [People] on
insert into [People] (Id, StaffName, StaffTitle, MeetDateTime, AdmissionId) values (1, 'Dr. Smith', 'ER Doc', '2023-07-29', 1), (2, 'Dr. Lee', 'Gastro Doc', '2023-07-29', 1), (3, 'Sarah', 'RN', '2023-07-29', 1);
set identity_insert [People] off

set identity_insert [Medication] on
insert into [Medication] (Id, MedicationName, Purpose, FrequencyHours, PrescribeDateTime, AdmissionId) values (1, 'Protonix', 'Indegestion', 12, '2023-07-29', 1), (2, 'Zofran', 'Nausea', 4, '2023-07-29', 1), (3, 'Nexium', 'Indegestion', 12, '2023-07-29', 1);
set identity_insert [Medication] off

set identity_insert [MedicationDose] on
insert into [MedicationDose] (Id, DoseDateTime, MedicationId) values (1, '2023-07-29 12:00 PM', 1), (2, '2023-07-29 12:00 PM', 2), (3, '2023-07-29 04:00 PM', 2), (4, '2023-07-29 12:00 PM', 3);
set identity_insert [MedicationDose] off

set identity_insert [Events] on
insert into [Events] (Id, EventDateTime, EventName, EventType, AdmissionId) values (1, '2023-07-29 10:00 AM', 'XRAY', 'Test', 1), (2, '2023-07-29 11:30 AM', 'CT scan', 'Test', 1), (3, '2023-07-29 12:00 PM', 'Back Pain', 'Symptom', 1);
set identity_insert [Events] off

set identity_insert [Questions] on
insert into [Questions] (Id, QuestionDateTime, AnswerDateTime, QuestionText, AnswerText, AdmissionId) values (1, '2023-07-29 12:00 PM', NULL, 'A QUESTION THAT HAS NOT BEEN ANSWERED YET', NULL, 1), (2, '2023-07-29 11:00 PM', '2023-07-29 12:00 PM', 'A QUESTION THAT HAS BEEN ANSWERED BY SOMEONE', 'AN ANSWER TO MY QUESTION THAT I HAD', 1);
set identity_insert [Questions] off





