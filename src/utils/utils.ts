import { randomUUID } from 'crypto';

export const sleep = (time: number = 1000): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
};

export const generateUUIDSimple = (): string => {
    return randomUUID().split('-').pop()!;
};

