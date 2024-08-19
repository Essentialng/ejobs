import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import JobSeekerRouter from './routes/jobSeeker/jobSeeker.router.js';
import JobEmployerRouter from './routes/jobEmployer/jobEmployer.router.js';
import AuthRouter from './routes/auth/auth.route.js';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import JobRoute from './routes/jobs/jobs.router.js';
import JobReportRoute from './routes/jobReport/jobReport.router.js';
import ApplicationRoute from './routes/applicationRoute/application.route.js';
import ContactPerson from './routes/contactPerson/contactPerson.router.js';
import morgan from 'morgan';
import EducationRoute from './routes/eduactionRoute/education.router.js';
import ExperienceRoute from './routes/experienceRoute/experienceRoute.js';
import CertificateRoute from './routes/certificateRoute/certificate.router.js';
import GuarantorRoute from './routes/guarantor/guarantor.router.js';
import NotificationRoute from './routes/notification/notification.js';
import InterviewRoute from './routes/interviewRoute/interview.router.js';
import MailRoute from './routes/mailNotification/mailNotification.router.js';
import SMSRoute from './routes/smsRoute/sms.route.js';
import HiredRoute from './routes/hiredRoute/hired.router.js'
import BenefitRoute from './routes/benefitRoute/benefit.route.js'
import EmployerReport from './routes/employerReport/employerReport.route.js'
import EmployeeReport from './routes/employeeReport/employeeReport.route.js'
import OfferRoute from './routes/jobsOffer/jobOffer.router.js'



// -------Socket io configurations--------
const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(morgan('dev'));

// multer confiuration

app.use('/api/v1/jobseeker', JobSeekerRouter);
app.use('/api/v1/notification', NotificationRoute);
app.use('/api/v1/jobrecruiter', JobEmployerRouter);
app.use('/api/v1/job', JobRoute);
app.use('/api/v1/jobReport', JobReportRoute);
app.use('/api/v1/offer', OfferRoute);
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/application', ApplicationRoute);
app.use('/api/v1/contactPerson', ContactPerson);
app.use('/api/v1/education', EducationRoute);
app.use('/api/v1/experience', ExperienceRoute);
app.use('/api/v1/certificate', CertificateRoute);
app.use('/api/v1/guarantor', GuarantorRoute);
app.use('/api/v1/interview', InterviewRoute);
app.use('/api/v1/sendMail', MailRoute);
app.use('/api/v1/sendSMS', SMSRoute);
app.use('/api/v1/hired', HiredRoute);
app.use('/api/v1/benefit', BenefitRoute);
app.use('/api/v1/employeeReport', EmployeeReport)
app.use('/api/v1/employerReport', EmployerReport)



//--------error handling-----------
app.use(errorHandler);

export default app;
