import { readUserSession } from '@/lib/actions';
import React, { useState, useEffect } from 'react';
import { readMemberNameByID } from '../tasks/actions';
import { createSupabaseAdmin } from '@/lib/supabase';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
	const { data: userSession } = await readUserSession();
	
		if (userSession.session) {
			const supabase= await createSupabaseAdmin();
			const { data: userStatus } = await supabase
				.from('permission')
				.select('status')
				.eq('member_id', userSession.session.user.id)
				.single();
	
			if (userStatus?.status === "resigned") {
				return redirect("/inactive");
			}}

    return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90%' }}>
			<h1 style={{ fontSize: '2.5em' }}>Your One Stop RBAC Dashboard!</h1>
			<div>
			</div>
		</div>
    );
}