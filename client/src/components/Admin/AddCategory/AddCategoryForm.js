import { useState } from 'react';

const AddCategoryForm = () => {
    const [categoryName, setCategoryName] = useState('');

    const handleCategoryNameChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/categories/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: categoryName })
            });
            if (response.ok) {
                // Category added successfully
                console.log('Category added successfully');
                // Optionally, you can redirect the user or perform any other action here
            } else {
                // Handle error
                console.error('Failed to add category');
            }
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    return (
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px] bg-white">
                <form className="py-6 px-9" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="categoryName" className="mb-3 block text-base font-medium text-[#07074D]">
                            Name of category:
                        </label>
                        <input
                            type="text"
                            id="categoryName"
                            placeholder="Watches for example"
                            value={categoryName}
                            onChange={handleCategoryNameChange}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
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
