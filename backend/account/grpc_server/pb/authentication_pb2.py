# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: pb/authentication.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x17pb/authentication.proto\x12\x02pb\"&\n\x15\x41uthenticationRequest\x12\r\n\x05token\x18\x01 \x01(\t\"&\n\x16\x41uthenticationResponse\x12\x0c\n\x04uuid\x18\x01 \x01(\t2W\n\x0e\x41uthentication\x12\x45\n\x0c\x41uthenticate\x12\x19.pb.AuthenticationRequest\x1a\x1a.pb.AuthenticationResponseb\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'pb.authentication_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  _AUTHENTICATIONREQUEST._serialized_start=31
  _AUTHENTICATIONREQUEST._serialized_end=69
  _AUTHENTICATIONRESPONSE._serialized_start=71
  _AUTHENTICATIONRESPONSE._serialized_end=109
  _AUTHENTICATION._serialized_start=111
  _AUTHENTICATION._serialized_end=198
# @@protoc_insertion_point(module_scope)
