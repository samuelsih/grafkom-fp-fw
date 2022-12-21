import { writable } from "svelte/store";
import { browser } from '$app/environment';

export const alertMessage = writable("");

export const highScore = writable([])