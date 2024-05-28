'use server';



export const createPoNumberAction = async (prevState: unknown ,formData: FormData) => {

 const po_number  = formData?.get('po_number');
 console.log(po_number);




 return {
    message: 'successfully'
 };

};