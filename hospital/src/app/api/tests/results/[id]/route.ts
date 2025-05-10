// /api/tests/results/[id].ts
import { NextResponse } from 'next/server';
import { PrismaClient, ReportStatus } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const reportId = params.id;
    
    if (!reportId) {
      return NextResponse.json(
        { error: 'Report ID is required' },
        { status: 400 }
      );
    }
    
    // First, try to fetch the specific medical report
    const report = await prisma.medicalReport.findUnique({
      where: {
        id: reportId,
      },
      include: {
        patient: {
          select: {
            id: true,
            name: true,
          },
        },
        doctor: {
          select: {
            id: true,
            name: true,
          },
        },
        testRequest: true,
      },
    });
    
    if (!report) {
      return NextResponse.json(
        { error: 'Medical report not found' },
        { status: 404 }
      );
    }
    
    // Find related reports for the same patient from the same doctor
    const relatedReports = await prisma.medicalReport.findMany({
      where: {
        patientId: report.patientId,
        doctorId: report.doctorId,
        id: {
          not: reportId, // Exclude the current report
        },
        // Only include reports from the last 30 days
        date: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        }
      },
      include: {
        testRequest: true,
      },
      orderBy: {
        date: 'desc'
      },
      take: 5, // Limit to 5 recent reports
    });
    
    // Format the current report
    const formattedReport = {
      id: report.id,
      name: report.name,
      type: report.type,
      fileUrl: report.fileUrl,
      results: report.results,
      date: report.date,
      status: report.status,
      patientName: report.patient.name,
      patientId: report.patientId,
      doctorName: report.doctor.name,
      doctorId: report.doctorId,
      testRequest: report.testRequest ? {
        testName: report.testRequest.name || 'Unknown Test', // Adjust field names as needed
        description: report.testRequest.description || 'No description available' // Adjust field names as needed
      } : null
    };
    
    // Format the related reports
    const formattedRelatedReports = relatedReports.map(relReport => ({
      id: relReport.id,
      name: relReport.name,
      type: relReport.type,
      fileUrl: relReport.fileUrl,
      date: relReport.date,
      status: relReport.status,
      testRequest: relReport.testRequest ? {
        testName: relReport.testRequest.name || 'Unknown Test', // Adjust field names as needed
        description: relReport.testRequest.description || 'No description available' // Adjust field names as needed
      } : null
    }));
    
    return NextResponse.json({
      report: formattedReport,
      relatedReports: formattedRelatedReports
    });
    
  } catch (error) {
    console.error('Error fetching medical report:', error);
    return NextResponse.json(
      { error: 'Failed to fetch medical report' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Add a PUT endpoint to update report status, useful for when viewing PDFs
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const reportId = params.id;
    
    if (!reportId) {
      return NextResponse.json(
        { error: 'Report ID is required' },
        { status: 400 }
      );
    }
    
    const data = await request.json();
    const { status } = data;
    
    // Update the report status (e.g., from PROCESSING to VIEWED)
    const updatedReport = await prisma.medicalReport.update({
      where: {
        id: reportId,
      },
      data: {
        status: status as ReportStatus,
        updatedAt: new Date(),
      },
    });
    
    return NextResponse.json({
      success: true,
      report: updatedReport
    });
    
  } catch (error) {
    console.error('Error updating medical report:', error);
    return NextResponse.json(
      { error: 'Failed to update medical report' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}