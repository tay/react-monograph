export const printDateFromInt = (date: number) => {
    const dateObj = new Date(date);
    return dateObj.toDateString();
}

export const printIngredient = (ingredient: string) => {
    const words = ingredient.split('_');
    return words.map((word) => {
        return word.replace(/(\w)(\w+)/,
            ((match, match1, match2) => {
                return match1 + match2.toLowerCase();
            }))
    }).join(' ');
}
