import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price oldPrice={!!salePrice}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {salePrice && <Price onSale={true}>{formatPrice(salePrice)}</Price>}
        </Row>
      </Wrapper>
      {variant !== "default" && (
        <VariantLabel variant={variant}>
          {variant === "on-sale" ? "Sale" : "Just released!"}
        </VariantLabel>
      )}
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  position: relative;
`;

const Wrapper = styled.article``;

const VariantLabel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  color: ${COLORS.white};
  width: fit-content;
  font-weight: 700;
  font-size: ${14 / 16}em;
  padding: 8px 10px;
  background-color: ${(p) => {
    switch (p.variant) {
      case "on-sale":
        return "#C5295D";
      case "new-release":
        return "#6868D9";
      default:
        return COLORS.primary;
    }
  }};
`;

const ImageWrapper = styled.div`
  position: relative;
  max-width: 400px;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: ${(p) => {
    if (p.onSale) {
      return "#C5295D";
    } else if (p.oldPrice) {
      return "#60666C";
    }
    return undefined;
  }};
  text-decoration-line: ${(p) => p.oldPrice && "line-through"};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
