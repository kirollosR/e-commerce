const AddCategoryForm = () => {
    return (

        <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px] bg-white">
            <form
            className="py-6 px-9"
            action="https://formbold.com/s/FORM_ID"
            method="POST"
            >
            <div className="mb-5">
                <label
                for="email"
                className="mb-3 block text-base font-medium text-[#07074D]"
                >
                Name of category:
                </label>
                <input
                type="email"
                placeholder="Watchs for example"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
            </div>

           
            <div>
                <button
                className="hover:shadow-form w-full rounded-md bg-black py-3 px-8 text-center text-base font-semibold text-white outline-none"

                >
                Add category 
                </button>
            </div>
            </form>
        </div>
        </div>
    );
};

export default AddCategoryForm;