USE [master]

IF db_id('Admitted') IS NULl
  CREATE DATABASE [Admitted]
GO

USE [Admitted]
GO


DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [Admission];
DROP TABLE IF EXISTS [People];
DROP TABLE IF EXISTS [Medication];
DROP TABLE IF EXISTS [MedicationDose];
DROP TABLE IF EXISTS [Events];
DROP TABLE IF EXISTS [Questions];
GO

CREATE TABLE [User] (
  [Id] int PRIMARY KEY IDENTITY,
  [Email] nvarchar(255) NOT NULL,
  [FullName] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Admission] (
  [Id] int PRIMARY KEY IDENTITY,
  [Reason] nvarchar(255),
  [HospitalName] nvarchar(255),
  [RoomNum] int,
  [RoomPhoneNum] nvarchar(255),
  [NurseChangeTime] nvarchar(255),
  [DoctorMeetTime] nvarchar(255),
  [EstimatedStayDays] int,
  [StartDateTime] datetime,
  [EndDateTime] datetime,
  [UserId] int
)
GO

CREATE TABLE [People] (
  [Id] int PRIMARY KEY IDENTITY,
  [StaffName] nvarchar(255),
  [StaffTitle] nvarchar(255),
  [MeetDateTime] datetime,
  [AdmissionId] int
)
GO

CREATE TABLE [Medication] (
  [Id] int PRIMARY KEY IDENTITY,
  [MedicationName] nvarchar(255),
  [Purpose] nvarchar(255),
  [FrequencyHours] int,
  [PrescribeDateTime] datetime,
  [AdmissionId] int
)
GO

CREATE TABLE [MedicationDose] (
  [Id] int PRIMARY KEY IDENTITY,
  [DoseDateTime] datetime,
  [MedicationId] int
)
GO

CREATE TABLE [Events] (
  [Id] int PRIMARY KEY IDENTITY,
  [EventDateTime] datetime,
  [EventName] nvarchar(255),
  [EventType] nvarchar(255),
  [AdmissionId] int
)
GO

CREATE TABLE [Questions] (
  [Id] int PRIMARY KEY IDENTITY,
  [QuestionDateTime] datetime,
  [AnswerDateTime] datetime,
  [QuestionText] nvarchar(255),
  [AnswerText] nvarchar(255),
  [AdmissionId] int
)
GO

ALTER TABLE [Admission] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [People] ADD FOREIGN KEY ([AdmissionId]) REFERENCES [Admission] ([Id])
GO

ALTER TABLE [Medication] ADD FOREIGN KEY ([AdmissionId]) REFERENCES [Admission] ([Id])
GO

ALTER TABLE [MedicationDose] ADD FOREIGN KEY ([MedicationId]) REFERENCES [Medication] ([Id])
GO

ALTER TABLE [Events] ADD FOREIGN KEY ([AdmissionId]) REFERENCES [Admission] ([Id])
GO

ALTER TABLE [Questions] ADD FOREIGN KEY ([AdmissionId]) REFERENCES [Admission] ([Id])
GO

