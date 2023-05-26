from Parser import Parser

if __name__ == "__main__":
    parser = Parser()

    print("STARTING DATABASE BUILD")
    parser.build_archives_database()
    print("100%")
    print("DATABASE BUILT WITH SUCCESS")
