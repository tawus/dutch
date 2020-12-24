import { calculatePendings } from '../PendingAmount';
test('test pending amount and member calculation for zero groups', () => {
    expect(calculatePendings([]).members).toBe(0);
    expect(calculatePendings([]).amount).toBe(0.0);
});

test('test pending amount and member calculation for zero groups', () => {
    const groups = [
        {
            members: {
                1: { paid: false, id: 1 },
                2: { paid: true, id: 2 },
                3: { paid: false, id: 3 },
            },
            amountPerPerson: 50,
        },
        {
            members: {
                1: { paid: true, id: 1 },
                2: { paid: true, id: 2 },
                3: { paid: false, id: 3 },
            },
            amountPerPerson: 50,
        },
        {
            members: {
                1: { paid: true, id: 1 },
                2: { paid: true, id: 2 },
                3: { paid: false, id: 3 },
            },
            amountPerPerson: 50,
            archived: true,
        },
    ];

    expect(calculatePendings(groups).members).toBe(2);
    expect(calculatePendings(groups).amount).toBe(150);
});
