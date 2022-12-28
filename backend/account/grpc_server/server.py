import psycopg2
import grpc
from concurrent import futures
from pb.authentication_pb2 import AuthenticationResponse
from pb.authentication_pb2_grpc import AuthenticationServicer, add_AuthenticationServicer_to_server

try:
    conn = psycopg2.connect("dbname='Authorization' user='admin' password='password' host='db' port='5432'")
except Exception as e:
    print(e)


class AuthenticationService(AuthenticationServicer):
    def Authenticate(self, request, context):
        cursor = conn.cursor()
        token = request.token

        cursor.execute('SELECT * FROM users WHERE token = %s;', (token, ))
        uuid = cursor.fetchall()[0][0]

        cursor.close()
        return AuthenticationResponse(
            uuid=uuid,
        )


if __name__ == "__main__":
    host = "0.0.0.0:50051"
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    add_AuthenticationServicer_to_server(AuthenticationService(), server)
    print("Start gRPC server on ", host)
    server.add_insecure_port(host)
    server.start()
    server.wait_for_termination()
