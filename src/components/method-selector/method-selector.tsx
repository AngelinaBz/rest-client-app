import { Select } from 'antd';
import { HTTP_METHODS } from '@/types';
import type { HttpMethod } from '@/types';

type MethodSelectorProps = {
  method: HttpMethod;
  setMethod: (value: HttpMethod) => void;
};

const MethodSelector = ({
  method,
  setMethod,
}: MethodSelectorProps): React.JSX.Element => {
  return (
    <Select
      title="method-selector"
      aria-label="method-selector"
      value={method}
      onChange={setMethod}
      style={{ width: 120 }}
    >
      {HTTP_METHODS.map((method) => (
        <Select.Option key={method} value={method}>
          {method}
        </Select.Option>
      ))}
    </Select>
  );
};

export default MethodSelector;
