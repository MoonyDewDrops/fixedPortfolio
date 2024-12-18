import type { Schema, Struct } from '@strapi/strapi';

export interface HeaderHeaderImages extends Struct.ComponentSchema {
  collectionName: 'components_header_header_images';
  info: {
    displayName: 'headerImages';
  };
  attributes: {
    contact: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    mijnWerk: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    overMij: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface HeaderHeaderNames extends Struct.ComponentSchema {
  collectionName: 'components_header_header_names';
  info: {
    displayName: 'headerNames';
  };
  attributes: {
    contact: Schema.Attribute.String;
    home: Schema.Attribute.String;
    mijnWerk: Schema.Attribute.String;
    overMij: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'header.header-images': HeaderHeaderImages;
      'header.header-names': HeaderHeaderNames;
    }
  }
}
