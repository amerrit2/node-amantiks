import { difference } from '../lib/arrays';

describe('Arrays', () => {
	it('should do a difference', () => {
		const l = [1, 2, 3, 4];
		const r = [3, 4, 5, 6];

		expect(difference(l, r)).toEqual([1, 2, 5, 6]);
	});
});
