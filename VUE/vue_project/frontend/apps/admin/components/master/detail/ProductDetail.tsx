import { productFamilyName } from '@constant/masterDataOption'
import { ProductMasterDataDetail } from '@type/mater/masterDataType'
import { changeTimeLocal } from 'library/util'
import { DetailTable, InputLabel } from 'ui/components'

const ProductDetail = ({ masterData }) => {
  const productData: ProductMasterDataDetail = masterData

  return (
    <>
      <article>
        {/* 컨텐츠 간 간격은 article 로 묶습니다. */}
        <div className="cont_title_box">
          <div className="align start">
            <p className="title1 mr_10">Master Data Information</p>
          </div>
        </div>
        {productData && (
          <DetailTable
            colgroup={
              <colgroup>
                <col style={{ width: '15%' }} />
                <col style={{ width: '35%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '35%' }} />
              </colgroup>
            }
          >
            <tr>
              <th>
                <InputLabel labelText="Product name" id="ipt01" />
              </th>
              <td>{productData.prdNm}</td>
              <th>
                <InputLabel labelText="CAT No." id="ipt01" />
              </th>
              <td>{productData.catNo}</td>
            </tr>
            <tr>
              <th>
                <InputLabel labelText="Product abbreviation" id="ipt01" />
              </th>
              <td>{productData.abb}</td>
              <th>
                <InputLabel labelText="Product abbreviation ID" id="ipt01" />
              </th>
              <td>{productData.abbId}</td>
            </tr>
            <tr>
              <th>
                <InputLabel labelText="Task code" id="ipt01" />
              </th>
              <td>{productData.taskCd}</td>
              <th>
                <InputLabel labelText="Size (rxn/Kit)" id="ipt01" />
              </th>
              <td>{productData.sz}</td>
            </tr>
            <tr>
              <th>
                <InputLabel labelText="Barcode" id="ipt01" />
              </th>
              <td>{productData.barcd}</td>
              <th>
                <InputLabel labelText="Expiration date" id="ipt01" />
              </th>
              <td>{changeTimeLocal({ time: productData.endDat, type: 'yyyy-MM-dd' })}</td>
            </tr>
            <tr>
              <th>
                <InputLabel labelText="Product category" id="ipt01" />
              </th>
              <td>{productData.dissCatCd ? productData.dissCatCd : '-'}</td>
              <th>
                <InputLabel labelText="Product family" id="ipt01" />
              </th>
              <td>{productFamilyName[productData.familyCd]}</td>
            </tr>
          </DetailTable>
        )}
      </article>
    </>
  )
}

export default ProductDetail
