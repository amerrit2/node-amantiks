export function intersection<L, R>(left: readonly L[], right: readonly R[]): (L & R)[] {
	return left.filter((val) => right.includes(val as any)) as any;
}

export function difference<L, R>(left: readonly L[], right: readonly R[]): (L | R)[] {
	return [
		...(left.filter((l) => !right.includes(l as any)) as any),
		...(right.filter((r) => !left.includes(r as any)) as any),
	];
}
