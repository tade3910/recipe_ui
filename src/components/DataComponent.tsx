import type { QueryStatus } from 'react-query';

interface DataComponentProps {
  status: QueryStatus;
  successComponent: React.ReactNode;
  loadingComponent: React.ReactNode;
  errorComponent?: React.ReactNode;
}

export default function DataComponent({
  status,
  successComponent,
  loadingComponent,
  errorComponent,
}: DataComponentProps) {
  return (
    <>
      {status === 'success'
        ? successComponent
        : status === 'loading'
          ? loadingComponent
          : errorComponent || loadingComponent}
    </>
  );
}
