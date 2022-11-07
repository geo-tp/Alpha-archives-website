from ParserManager import ParserManager

if __name__ == "__main__":
    parser = ParserManager()

    print("STARTING DATABASE BUILD")
    parser.build_archives_database()
    print("100%")
    print("DATABASE BUILT WITH SUCCESS")
