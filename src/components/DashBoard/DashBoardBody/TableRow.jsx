/* eslint-disable react/prop-types */


export default function TableRow({ data,children }) {
  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask  w-12 h-12">
              <img src={data.banner} alt={data.title} />
            </div>
          </div>
        </div>
      </td>
      <td>
        {data.title}
      </td>      
      <td>
        {data.categorey}
      </td>
        {children}
    </tr>
  );
}
