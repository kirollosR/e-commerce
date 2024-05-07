import { useState } from 'react';
import { Addcategories } from '../../../apis/categoriesApis'; // Import your API connection

const AddCategoryForm = () => {
    const [categoryName, setCategoryName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!categoryName.trim()) {
            setErrorMessage('Category name cannot be empty');
            return;
        }

        try {
            setIsLoading(true); // Set loading state to true to disable the button
            await Addcategories(categoryName);
            // Reset form after successful submission if needed
            setCategoryName('');
            setSuccessMessage('Category added successfully');
        } catch (error) {
            // Handle error, e.g., show error message
            setErrorMessage('Failed to add category');
        } finally {
            setIsLoading(false); // Set loading state back to false after request completion
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
                            placeholder="Watchs for example"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    {errorMessage && <div className="text-red-600 mb-2">{errorMessage}</div>}
                    {successMessage && <div className="text-green-600 mb-2">{successMessage}</div>}
                    <div>
                        <button
                            type="submit"
                            className="hover:shadow-form w-full rounded-md bg-black py-3 px-8 text-center text-base font-semibold text-white outline-none"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Adding category...' : 'Add category'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCategoryForm;