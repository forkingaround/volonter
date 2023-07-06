import { useState, useEffect } from 'react';
import { Panel } from 'primereact/panel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
//import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {

    const [dashboardData, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            fetch('/dashboard-view-projects')
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setData(data);
                })
                .catch(error => {
                    console.error('Error fetching project:', error);
                });
        }
        fetchData();
    }, []);

    const viewTemplate = (item) => {
        return (
            <Button icon="pi pi-eye" size="small" onClick={(e) => {
                e.stopPropagation();
                navigate('/project?id=' + item.project_id)
            }} />
        );
    }
    const deleteTemplate = (item) => {
        return (
            <Button icon="pi pi-times-circle" size="small" onClick={(e) => {
                e.stopPropagation();
                fetch('/deleteproject?id='+item.project_id)
                    .then(
                        fetch('/dashboard-view-projects')
                            .then(res => res.json())
                            .then(data => {
                                console.log(data);
                                setData(data);
                            })
                            .catch(error => {
                                console.error('Error fetching project:', error);
                            })
                    )
                    .catch(error => {
                        console.error('Error fetching project:', error);
                    });
            }} />
        );
    }

    return (
        <>
            <Panel header="All Projects" toggleable>
                <DataTable value={dashboardData} tableStyle={{ minWidth: '60rem' }}>
                    <Column field="project_id" header="ID"></Column>
                    <Column field="title" header="Title"></Column>
                    <Column header="View" body={viewTemplate} ></Column>
                    <Column header="Delete" body={deleteTemplate} ></Column>
                </ DataTable>
            </Panel>
        </>
    );
}