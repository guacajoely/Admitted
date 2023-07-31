USE [Admitted];
GO

set identity_insert [User] on
insert into [User] (Id, FullName, Email) values (1, 'Foo Barington', 'foo@bar.com'),  (2, 'Test User', 'test@email.com'),  (3, 'Joel Dick', 'guacajoely@gmail.com');
set identity_insert [User] off

set identity_insert [Admission] on
insert into [Admission] (Id, Reason, HospitalName, RoomNum, RoomPhoneNum, NurseChangeTime, DoctorMeetTime, EstimatedStayDays, StartDateTime, EndDateTime, UserId) values (1, 'Pneumonia', 'Cabell Huntington Hospital', 201, '(304) 555-5555', 8, NULL, 3, '2023-07-29', NULL, 2);
set identity_insert [Admission] off

set identity_insert [People] on
insert into [People] (Id, StaffName, StaffTitle, MeetDateTime, AdmissionId) values (1, 'Dr. Smith', 'ER Doc', '2023-07-29', 1);
set identity_insert [People] off

set identity_insert [Medication] on
insert into [Medication] (Id, MedicationName, Purpose, FrequencyHours, PrescribeDateTime, AdmissionId) values (1, 'Protonix', 'Indegestion', 12, '2023-07-29', 1);
set identity_insert [Medication] off

set identity_insert [MedicationDose] on
insert into [MedicationDose] (Id, DoseDateTime, MedicationId) values (1, '2023-07-29', 1);
set identity_insert [MedicationDose] off

set identity_insert [Events] on
insert into [Events] (Id, EventDateTime, EventName, EventType, AdmissionId) values (1, '2023-07-29', 'XRAY', 'Test', 1);
set identity_insert [Events] off

set identity_insert [Questions] on
insert into [Questions] (Id, QuestionDateTime, AnswerDateTime, QuestionText, AnswerText, AdmissionId) values (1, '2023-07-29', NULL, 'A QUESTION THAT HAS NOT BEEN ANSWERED YET', NULL, 1), (2, '2023-07-29', '2023-07-29', 'A QUESTION THAT HAS BEEN ANSWERED BY SOMEONE', 'AN ANSWER TO MY QUESTION THAT I HAD', 1);
set identity_insert [Questions] off





