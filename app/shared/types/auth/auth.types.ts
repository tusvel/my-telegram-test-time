import { NextPage } from 'next';

export type TypeRoles = {
  isOnlySuperAdmin?: boolean;
  isOnlyAdmin?: boolean;
  isOnlyUser?: boolean;
};

export type NextPageAuth<P = {}> = NextPage<P> & TypeRoles;

export type TypeComponentAuthFields = { Component: TypeRoles };
