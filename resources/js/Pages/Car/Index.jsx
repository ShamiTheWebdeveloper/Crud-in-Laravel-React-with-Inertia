
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import DataTable from 'react-data-table-component';
function Index({cars}) {
    const {delete: destroy,processing}=useForm();

    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
        },
        {
            name: 'Company',
            selector: row => row.company,
        },
        {
            name: 'Model',
            selector: row => row.model,
        },
        {
            name: 'Description',
            selector: row => row.description,
        },
        {
            name: 'Action',
            selector: row =>(<div className='d-flex pt-2'>
                <Link href={route('cars.edit',row)} type="button" className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900' >Edit</Link>
                {'\u00A0'}
                {'\u00A0'}
                <button type='button' disabled={processing} onClick={() => deleteCar(row)} className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>Delete</button>
            </div>),
        }
    ];
    function deleteCar(car) {
        if (confirm('Are you sure you want to delete this car?')) {
            destroy(route('cars.destroy',car))
        }
    }


    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Cars
                </h2>
            }
        >
            <Head title="Cars" />

            <div className="py-4">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="py-6 float-end">
                        <Link href={route('cars.create')} className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Add</Link>
                    </div>
                    {/*<DataTable columns={columns} data={cars} className='shadow' pagination={true} sorting={true} search={true} />*/}
                    <DataTable columns={columns} data={cars} className='shadow'  pagination={true} fixedHeader={true}/>

                </div>
            </div>

        </AuthenticatedLayout>
);
}

export default Index;
