import {Head, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import {Textarea} from "@headlessui/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {useEffect} from "react";
import InputError from "@/Components/InputError.jsx";
import Loader from "@/Components/Loader.jsx";

function Create({car = null}) {
    const {data,setData,post,processing,errors,reset}=useForm({
        id:'',
        company:'',
        model:'',
        description:'',
    });

    useEffect(() => {
        if (car) {
            setData({
                id: car.id || '',
                company: car.company || '',
                model: car.model || '',
                description: car.description || '',
            });
        }
    }, [car]);

    function Save(e){
        e.preventDefault();
        post(route('cars.store'))
    }
    return (
        <AuthenticatedLayout>
            <Head title="Create Car" />
            <div className='py-12 mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8'>
                <form className='bg-white p-4 shadow sm:rounded-lg sm:p-8' onSubmit={Save}>
                    <div className='my-4'>
                        <InputLabel htmlFor="company" value="Company"/>
                        <TextInput id="company" onChange={(e) => setData('company', e.target.value)} value={data.company} className="mt-1 block w-3/4" isFocused={true} placeholder="Company"/>
                        <InputError message={errors.company} className="mt-2" />
                    </div>
                    <div className='my-4'>
                        <InputLabel htmlFor="model" value="Model"/>
                        <TextInput id="model" onChange={(e) => setData('model', e.target.value)} value={data.model} className="mt-1 block w-3/4" isFocused={true} placeholder="Model"/>
                        <InputError message={errors.model} className="mt-2" />
                    </div>
                    <div className='my-4'>
                        <InputLabel htmlFor="description" value="Description"/>
                        <Textarea id="description" rows={10} cols={40} onChange={(e) => setData('description', e.target.value)}  className='mt-1 block w-3/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ' value={data.description} placeholder="Description"/>
                        <InputError message={errors.description} className="mt-2" />
                    </div>
                    <div className='my-4 flex items-center'>
                        {!processing &&
                        <PrimaryButton loading={processing} disabled={processing}>
                            Save
                        </PrimaryButton>
                        }
                        {processing &&
                            <Loader/>
                        }


                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

export default Create;
