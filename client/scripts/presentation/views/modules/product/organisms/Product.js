/* @flow */
import React, { Fragment } from 'react'
import { compose, pure, type HOC } from 'recompose'
import connector from '~/presentation/views/modules/product/hocs/connector'
import Loading from '~/presentation/views/_core/atoms/Loading'
import ProductDetails from '~/presentation/views/modules/product/molecules/ProductDetails'
import ProductThumb from '~/presentation/views/modules/product/molecules/ProductThumb'
import ProductSale from '~/presentation/views/modules/product/molecules/ProductSale'

const enhancer: HOC<*, *> = compose(connector, pure)

export default enhancer(({ actions, commonVM, productsVM, cartVM }) => {
  const isFetching: boolean = commonVM.hasEventkeyInFetchingQueue()
  const queryProductCode: string = commonVM.selectQueryValueByKey('productCode')
  const productVM: ProductViewModel = productsVM.selectProductByProductCode(
    queryProductCode
  )
  const _props = { actions, productVM, cartVM }

  return (
    <Fragment>
      {isFetching || !productVM ? (
        <Loading />
      ) : (
        <div className="prdct-Container">
          <Fragment>
            <div className="prdct-Container_Thumb">
              <ProductThumb {..._props} />
            </div>
            <div className="prdct-Container_Data">
              <Fragment>
                <ProductDetails {..._props} />
                <ProductSale {..._props} />
              </Fragment>
            </div>
          </Fragment>
        </div>
      )}
    </Fragment>
  )
})
