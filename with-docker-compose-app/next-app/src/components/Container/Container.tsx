import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps): JSX.Element {
  return (
    <div className='container-fluid p-0'>
      {children}
    </div>
  );
}
