import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import LogoutButton from '@/components/LogoutButton';

// -----------------------
// Server Component: Admin Dashboard
// -----------------------
export default async function AdminDashboard() {
  // ✅ Check admin cookie
  const cookieStore = cookies();
  const adminAuth = cookieStore.get('admin_auth');
  if (!adminAuth) redirect('/admin/login');

  // ✅ Fetch all submissions from Prisma
  const submissions = await prisma.lotterySubmission.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className='admin-wrapper'>
      <div  className='admin'>

      
      <h1>🎯 Admin Dashboard</h1>
      <div className="subtitle">
          Manage all lottery submissions and track participants.
        </div>

      {/* Logout Button */}
      <div className='logout-wrapper'>
 <LogoutButton />
      </div>
     

      <table
        border="1"
        cellPadding="8"
        style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20 }}
      >
        <thead>
          <tr>
            {/* <th>ID</th> */}
            {/* <th>Customer ID</th> */}
            <th>Name</th>
           
            <th>WhatsApp Number</th>
          
            <th>Terms</th>
            <th>Privacy</th>
            <th>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {submissions.length === 0 && (
            <tr>
              <td colSpan="9" style={{ textAlign: 'center' }}>
                No submissions yet
              </td>
            </tr>
          )}
          {submissions.map((s) => (
            <tr key={s.id}>
              {/* <td>{s.id}</td> */}
              {/* <td>{s.uniqueId}</td> */}
              <td>{s.name}</td>
             
              <td>{s.phone || '-'}</td>
              
              <td>{s.accepted_terms ? 'Yes' : 'No'}</td>
              <td>{s.accepted_privacy ? 'Yes' : 'No'}</td>
              <td>{new Date(s.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </main>
  );
}
