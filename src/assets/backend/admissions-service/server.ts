import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4001; // Using 4001 for Admissions Microservice

app.use(cors());
app.use(express.json());

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', service: 'admissions-service' });
});

// Submit Application Endpoint
app.post('/api/applications', async (req: Request, res: Response) => {
  try {
    const data = req.body;
    
    // Create new application record in the database
    const application = await prisma.application.create({
      data: {
        guardianName: data.guardianName,
        guardianRelation: data.guardianRelation,
        guardianOccupation: data.guardianOccupation,
        guardianCompany: data.guardianCompany,
        guardianEmail: data.guardianEmail,
        guardianPhone: data.guardianPhone,
        guardianAddress: data.guardianAddress,
        guardianCity: data.guardianCity,
        guardianPin: data.guardianPin,
        studentName: data.studentName,
        studentDob: new Date(data.studentDob),
        studentGender: data.studentGender,
        studentNationality: data.studentNationality,
        studentLanguage: data.studentLanguage,
        studentBloodGroup: data.studentBloodGroup,
        studentMedical: data.studentMedical,
        programApplied: data.programApplied,
        previousSchool: data.previousSchool,
        lastGradeCompleted: data.lastGradeCompleted,
        curriculumBoard: data.curriculumBoard,
        extracurricularInterests: data.extracurricularInterests,
        transportationRequired: data.transportationRequired === 'yes',
        enrollmentType: data.enrollmentType,
        referralSource: data.referralSource,
        reasonForEnrolling: data.reasonForEnrolling,
      }
    });

    res.status(201).json({ success: true, applicationId: application.id });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ success: false, message: 'Failed to submit application' });
  }
});

// Get all applications (Admin)
app.get('/api/applications', async (req: Request, res: Response) => {
  try {
    const applications = await prisma.application.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch applications' });
  }
});

app.listen(PORT, () => {
  console.log(`Admissions Microservice running on http://localhost:${PORT}`);
});
