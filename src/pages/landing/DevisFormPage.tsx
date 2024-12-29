import  { ReactElement, useEffect } from 'react';
import DevisForm from 'components/DevisForm/DevisForm';

const DevisFormPage= () : ReactElement => {
  useEffect(() => {
    // Hide header when component mounts
    const header = document.querySelector('header');
    if (header) {
      header.style.display = 'none';
    }

    // Show header when component unmounts
    return () => {
      const header = document.querySelector('header');
      if (header) {
        header.style.display = '';
      }
    };
  }, []);

  return (
    <div style={{ 
      backgroundColor: '#224067',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
    }}>
      <DevisForm />
    </div>
  );
};

export default DevisFormPage;
