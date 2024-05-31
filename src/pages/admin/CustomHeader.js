import './Admin.module.css'

const CustomHeader = ({ title }) => {
  return (
    <th className="custom-header">
      {title}
    </th>
  );
};

export default CustomHeader;