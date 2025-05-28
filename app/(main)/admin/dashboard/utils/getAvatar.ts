export const getAvatar = (fullName: string): string => { 
    return fullName.split(' ')
            .map((word) => word[0])
            .slice(0, 2)
            .join('');
}