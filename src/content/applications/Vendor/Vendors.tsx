import { Card } from '@mui/material';
import { useGetAllVendorQuery } from 'src/generated';
// import { Vendor } from 'src/models/vendor';
import VendorsTable from './VendorsTable';

export interface Vendor {
  vendor_id: number;
  vendor_name: string;
  phone: string;
  email: string;
  street: string;
  district: string;
  city: string;
  zip_code: string;
  active: boolean;
}

interface Props {
  vendors: Vendor[];
}

function Vendors({ vendors }: Props) {

  return (
    <Card>
      <VendorsTable Vendors={vendors} />
    </Card>
  );
}

export default Vendors;
