import { ComponentType } from "react";
import { connect } from "react-redux";
import { StoreType } from ".";

export type UseConnected<KnownProps> = <TProps>(
  Component: ComponentType<TProps & KnownProps>
) => ComponentType<TProps>;

export type ExtractConnect<Something> = Something extends UseConnected<infer R>
  ? R
  : never;

/**
 * This function works in the same way as the connect() from react-redux
 * but is more strict, knows the type of the store, and also allows to extract it's types very
 * easily using ExtractConnect
 */
export const useConnect = <PropsFromStore, PropsDispatch, TProps>(
  mapStateToProps: (store: StoreType) => PropsFromStore,
  mapDispatchToProps: PropsDispatch
): UseConnected<PropsFromStore & PropsDispatch> =>
  connect(mapStateToProps, mapDispatchToProps) as any;
