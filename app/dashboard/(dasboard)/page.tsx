import { readUserSession } from '@/lib/actions';
import React, { useState, useEffect } from 'react';
import { readMemberNameByID } from '../tasks/actions';

export default function Dashboard() {

    return (
		<div style={{ fontSize: '2em' }}>
			<h1 style={{ fontSize: '2.5em' }}>Your Dashboard</h1>
			<p>This dashboard provides an overview of the Role-Based Access Control (RBAC) system. Here you can manage roles, users and tasks effectively.</p>
			<div>
			</div>
		</div>
    );
}