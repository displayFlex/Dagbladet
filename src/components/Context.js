import React from 'react';

const MyContext = React.createContext({
    list: undefined,
    editFunction: undefined,
    deleteFunction: undefined,
    opened: false
});

export default MyContext;