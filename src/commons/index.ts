export const pascalCaseWord = (word:string) => {
    return word.replace(/(\b[a-z](?!\s))/g, function(x){return x.toUpperCase();})
}