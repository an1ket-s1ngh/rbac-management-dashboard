import { readUserSession } from '@/lib/actions';
import React, { useState, useEffect } from 'react';
import { readMemberNameByID } from '../tasks/actions';

export default function Dashboard() {

    return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90%' }}>
			<h1 style={{ fontSize: '2.5em' }}>Your One Stop RBAC Dashboard!</h1>
			<div>
			</div>
		</div>
    );
}