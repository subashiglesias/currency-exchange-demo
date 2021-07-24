export const renderIfElse = (condition, ifCallback, elseCallback) => (condition() ? ifCallback() : elseCallback());
