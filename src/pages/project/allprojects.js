import { useState, useEffect } from 'react';

export function getDashboard () {
    const [id, setId] = useState();
    const [title, setTitle] = useState();

    fetch('/dashboard-view-projects')
    
}