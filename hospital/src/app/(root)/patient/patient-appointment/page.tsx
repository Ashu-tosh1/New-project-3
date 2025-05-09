"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {  useUser } from '@clerk/nextjs';  // Use Clerk's auth hook
import axios from 'axios';

type Appointment = {
  id: string;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  status: string;
};

export default function PatientAppointments() {
  const { user, isLoaded, isSignedIn } = useUser();  // Get Clerk's user and auth status
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

    useEffect(() => {
        console.log({ isLoaded, isSignedIn, user });
    const fetchAppointments = async () => {
      if (isLoaded && isSignedIn) {
        try {
          const clerkUserId = user.id;  // This is the Clerk user ID

          // Step 1: Get the patient ID by passing the Clerk User ID
          const patientResponse = await axios.post('/api/patient/getId', {
            clerkUserId,
          });

          if (patientResponse.data.error) {
            setError(patientResponse.data.error);
            setLoading(false);
            return;
          }

          const patientId = patientResponse.data.patientId;

          // Step 2: Fetch appointments using the patientId
          const response = await axios.get(`/api/appointmentBooked?patientId=${patientId}`);
          setAppointments(response.data);
            setLoading(false);
            console.log(response)
        } catch (err) {
          setError('Failed to fetch appointments.');
          setLoading(false);
        }
      }
    };

    fetchAppointments();
  }, [isLoaded, isSignedIn, user]);

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="border p-4 rounded-md shadow-sm bg-white dark:bg-gray-800"
            >
              <p><strong>Doctor:</strong> {appt.doctorName}</p>
              <p><strong>Specialization:</strong> {appt.specialization}</p>
              <p><strong>Date:</strong> {appt.date}</p>
              <p><strong>Time:</strong> {appt.time}</p>
              <p><strong>Status:</strong> {appt.status}</p>

              <button
                onClick={() => router.push(`/patient/consulation/${appt.id}`)}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Start Consultation
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
