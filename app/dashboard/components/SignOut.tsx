"use client";
import { logout } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function SignOut() {
	const [isPending, startTransition] = useTransition();
	const onSubmit = async () => {
		startTransition(async () => {
			await logout();
			clearCookies();
			clearCache();
		});
	}

	function clearCookies() {
		document.cookie = ""; // Clear all cookies
	}

	function clearCache() {
		if (window.caches) {
			window.caches.keys().then(function (cacheNames) {
				cacheNames.forEach(function (cacheName) {
					window.caches.delete(cacheName); // Clear cache
				});
			});
		}
	}

	return (
		<form action={onSubmit}>
			<Button
				className="w-full flex items-center gap-2"
				variant="outline"
			>
				SignOut{" "}
				<AiOutlineLoading3Quarters
					className={cn(" animate-spin", { hidden: !isPending })}
				/>
			</Button>
		</form>
	);
}
