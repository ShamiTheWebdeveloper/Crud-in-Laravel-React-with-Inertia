import {Head, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import {Textarea} from "@headlessui/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

function Create(car) {
    const {data,setData,post,processing,errors,reset}=useForm({
        company:'',
        model:'',
        description:'',
    })

    console.log(car);

    function Save(e){
        e.preventDefault();

        post(route('cars.store'),{
            onFinish:()=>reset('company','model','description')
        })
    }
    return (
        <AuthenticatedLayout>
            <Head title="Create Car" />
            <div className='py-12 mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8'>
                <form className='bg-white p-4 shadow sm:rounded-lg sm:p-8' onSubmit={Save}>
                    <div className='my-4'>
                        <InputLabel htmlFor="company" value="Company"/>
                        <TextInput id="company" onChange={(e) => setData('company', e.target.value)} value={data.company} className="mt-1 block w-3/4" isFocused={true} placeholder="Company"/>
                    </div>
                    <div className='my-4'>
                        <InputLabel htmlFor="model" value="Model"/>
                        <TextInput id="model" onChange={(e) => setData('model', e.target.value)} value={data.model} className="mt-1 block w-3/4" isFocused={true} placeholder="Model"/>
                    </div>
                    <div className='my-4'>
                        <InputLabel htmlFor="description" value="Description"/>
                        <Textarea id="description" rows={10} cols={40} onChange={(e) => setData('description', e.target.value)}  className='mt-1 block w-3/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ' value={data.description} placeholder="Description"/>
                    </div>
                    <div className='my-4'>
                        <PrimaryButton  disabled={processing}>
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

export default Create;
